import React, { useEffect, Component } from 'react'
import { View, Text, Image, StyleSheet, PanResponder, Platform, Animated, Dimensions } from 'react-native'
import Banana from './fullBanana'
import HalfPeeled from './halfPeeled'
import Peel from './bananaPeel'
import Barrel from './barrel'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'
import BananaAgingPhase1 from './bananaAgingPhase1'
import BananaAgingPhase2 from './bananaAgingPhase2'
import BananaAgingPhase3 from './bananaAgingPhase3'
import BananaAgingPhase4 from './bananaAgingPhase4'
import BananaAgingPhase5 from './bananaAgingPhase5'
import BananaAgingPhase6 from './bananaAgingPhase6'
import YellowSpotted from './yellowSpotted'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { transform } from 'typescript'
class BananaComponent extends Component {
    
    constructor(props) {
        super(props);
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => {
                // console.log("start", gestureState)
                true},
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            
            onPanResponderGrant: (evt, gestureState) => {

                // console.log(Dimensions.get("screen").height)
                // console.log(Dimensions.get("screen").width)
                // console.log("barrel", evt)
                // console.log("position", evt)
                
                // console.log("yo",evt)
                // if (evt.target === 6097){
                // console.log("Barrel X", evt, "Barrel Y", evt)
            // }
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // console.log("banana", evt)
                // this.setState({bananaX: evt.nativeEvent.locationX, bananaY: evt.nativeEvent.locationY})
                if (gestureState.dy > 20 && this.state.banana != "peeled"){
                    this.setState({banana: 'half'})
                }
                if(gestureState.dy > 40 && this.state.banana != "peeled"){
                    this.setState({banana: 'peeled', runTimer: false})
                }
                if (this.state.banana === "peeled"){
                    // console.log("yo", )
                    // console.log("event", evt, gestureState)
                    evt._targetInst.key = "peel-in-action"
                    // console.log("event tag", evt)
                    // console.log(this.state.position)
                    
                }
                if (this.state.banana === "peeled" && evt._targetInst.key === "peel-in-action"){

                    // console.log(evt.touchHistory.touchBank[1].currentPageX)
                    let peelPositionX = evt.touchHistory.touchBank[1].currentPageX
                    let peelPositionY = evt.touchHistory.touchBank[1].currentPageY
                    // if (Math.abs(peelPositionX - this.state.targetPostionX1)  < 40 && Math.abs(peelPositionY - this.state.targetPostionY1) < 40){
                    //                     this.setState({swipedToBarrel: true})
                    //                     this.props.setScore(1)
                    //                 }
                                        // console.log(this.state.swipedToBarrel, gestureState)
                    // console.log("event", evt.nativeEvent.locationX, evt.nativeEvent.locationY)
                    // this.setState({position: {x: gestureState.dx, y: gestureState.dy}})
                    // console.log(this.state.position)

                }
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // console.log("released")
                // console.log("released", this.state)
                this.setState({released: true})

                // if(this.state.banana === "peeled"){
                // }
                // console.log(this.state)
                // console.log("release target", evt.tagret)
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });

        this.componentDidMount=()=>{
            this.interval = setInterval(
                () =>{
                 this.setState((prevState) => ({ timer: prevState.timer + 1 }))
                    if(this.state.runTimer===false){
                        clearInterval(this.interval)
            }
        },
            1000);

            
            //  this.showPeel=(image)=>{
            //     console.log(image)
            // }
        }
                this.state = {
                    banana: 'full',
                    bananaAge: "",
                    swipedForBarrel: false,
            swipedToBarrel: false,
            bananaPosition: new Animated.ValueXY({x: 100, y: 160}),
             barrelPosition: new Animated.ValueXY({ x: 1, y: 1 }), 
                    targetPostionX1: 25.66665649414062,
                    targetPostionY1: 243.6666564941406,
                    released: false,
                    runTimer: true,
                    timer: 0,
                    gestureName: 'none',
                    myText: ""
                }
            }
    
    onSwipe = () => {
        console.log("swiped")
    }
     onSwipeDown = () => {
        console.log("down")
    }
    onSwipeLeft = () => {
        console.log("left")
    }
    onSwipeRight = () => {
        console.log("right")
    }
     onSwipeUp = () => {
        console.log("up")
    }
     config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    }
    onSwipeUp(gestureState) {
        this.setState({ myText: 'You swiped up!' });
    }

    onSwipeDown(gestureState) {
        this.setState({ myText: 'You swiped down!' });
    }

    onSwipeLeft(gestureState) {
        this.setState({ myText: 'You swiped left!' });
    }

    onSwipeRight(gestureState) {
        this.setState({ myText: 'You swiped right!' });
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
                console.log("up")
                break;
            case SWIPE_DOWN:
                console.log("down")
                break;
            case SWIPE_LEFT:
                console.log("left")
                break;
            case SWIPE_RIGHT:
                console.log("right")
                break;
        }
    }
    handlePress=()=>{

    }

     bananaTransform = {
    transform: [
        {
            translateY: 50
        },
        {
            translateX: 50
        }
    ],
}
    render() {
        // console.log(this.state)
        // console.log(this.state)
        {if (this.state.banana === 'full'){ 
        return(
            <Animated.View {...this._panResponder.panHandlers} style={{
                width: Dimensions.get("screen").width, height: Dimensions.get("screen").height}}
    >

                <Animated.View 
                
                // onLayout={({ nativeEvent }) => {
                //     console.log("barrel native", nativeEvent)
                //     this.setState({ barrelPosition: {X: nativeEvent.layout.x, y: nativeEvent.layout.y }})                }}
                   style = {this.state.barrelPosition.getLayout()}
                    >
                <Barrel  />
                </Animated.View>
                {this.state.timer > 0 && this.state.timer <= 10 ?
                 <Animated.View style={this.state.bananaPosition.getLayout()}>
                    <BananaAgingPhase1 style={this.styles.banana}/>
                </Animated.View>
                    : this.state.timer > 10 && this.state.timer <= 20 ?
                
                <Animated.View 
                
                // onLayout={({ nativeEvent }) => {
                    //     this.setState({ bananaPosition: {x: nativeEvent.layout.x, y: nativeEvent.layout.y} })
                    //     console.log("banana native", nativeEvent)
                    // }}
                    style={this.state.bananaPosition.getLayout()}
                    >
                            <BananaAgingPhase2 onPanResponderGrant onStartShouldSetPanResponder onPanResponderRelease/>
               
                </Animated.View>
                        : this.state.timer > 20 && this.state.timer <= 30 ? 
                <Animated.View style={this.state.bananaPosition.getLayout()}>
           < BananaAgingPhase3/>
                </Animated.View>
                : this.state.timer > 30 && this.state.timer <= 32 ? 
                 <Animated.View style={this.state.bananaPosition.getLayout()}>
                
           < YellowSpotted/>
                </Animated.View>
                                : this.state.timer > 32 && this.state.timer <= 40  ? 
                <Animated.View style={this.state.bananaPosition.getLayout()}>

                 <BananaAgingPhase4/>
                </Animated.View>
                                    : this.state.timer > 40 && this.state.timer <= 50 ? 
                 <Animated.View style={this.state.bananaPosition.getLayout()}>
                 <BananaAgingPhase5/>
                </Animated.View>
                                        : this.state.timer > 50 && this.state.timer <= 60 ? 
             <Animated.View style={this.state.bananaPosition.getLayout()}>

                 <BananaAgingPhase6/>
                </Animated.View>
                : null
            }
            </Animated.View>
        )
    }}
        {if (this.state.banana === 'half'){ 
        return(
            <Animated.View {...this._panResponder.panHandlers} style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height}}>
                <Animated.View 
                // onLayout={({ nativeEvent }) => {
                //     this.setState({ barrelPosition: { X: nativeEvent.layout.x, y: nativeEvent.layout.y } })
                // }}
                    style={this.state.barrelPosition.getLayout()}
                >
                    <Barrel />
                </Animated.View>
                <Animated.View 
                // onLayout={({ nativeEvent }) => {
                //     this.setState({ bananaPosition: { x: nativeEvent.layout.x, y: nativeEvent.layout.y } })
                // }}
                    style={this.state.bananaPosition.getLayout()}
                >
                    <HalfPeeled onPanResponderGrant onStartShouldSetPanResponder />
                </Animated.View>
            </Animated.View>
        )
    }}

        
        
        {if (this.state.banana === 'peeled'){ 
        return(
    
            <Animated.View {...this._panResponder.panHandlers} style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height }} >
                <Animated.View 
                // onLayout={({ nativeEvent }) => {
                //     this.setState({ barrelPosition: { X: nativeEvent.layout.x, y: nativeEvent.layout.y } })
                // }}
                    style={this.state.barrelPosition.getLayout()}
                    
                    >
                    <Barrel />
                </Animated.View>
                {!this.state.swipedToBarrel && this.state.timer > 0 && this.state.timer < 60 ?
                    <Animated.View 
                        
                        // onLayout={({ nativeEvent }) => {
                        //     this.setState({ bananaPosition: { x: nativeEvent.layout.x, y: nativeEvent.layout.y } })
                        // }}
                        style={[this.state.bananaPosition.getLayout()]}
  >
                        {/* <GestureRecognizer
                            onSwipe={this.onSwipe}
                            onSwipeUp={this.onSwipeUp}
                            onSwipeDown={this.onSwipeDown}
                            onSwipeLeft={this.onSwipeLeft}
                            onSwipeRight={this.onSwipeRight}
                            config={this.config}
                        > */}
                        <Peel style ={this.state.swipedForBarrel ? this.bananaTransform : null}
                        
                        />
                        {/* </GestureRecognizer> */}
                    </Animated.View>
                    :
                    null}
            </Animated.View>
                
        )
    }}
        ;
    }
     styles = StyleSheet.create({
    
        banana: {
            flex: 1,
            width: 20,
            height:80
        }
    })
}




export default BananaComponent