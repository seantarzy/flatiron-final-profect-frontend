import React, { useEffect, Component } from 'react'
import { View, Text, Image, StyleSheet, PanResponder, Platform, Animated } from 'react-native'
import Banana from './fullBanana'
import HalfPeeled from './halfPeeled'
import Peel from './bananaPeel'
import Barrel from './barrel'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'
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
                // console.log("event", evt, gestureState)

                // this.setState({bananaX: evt.nativeEvent.locationX, bananaY: evt.nativeEvent.locationY})
                if(gestureState.dy > 20){
                    this.setState({banana: 'half'})
                }
                if(gestureState.dy > 40){
                    this.setState({banana: 'peeled'})
                }
                if (this.state.banana === "peeled"){
                    evt._targetInst.key = "peel-in-action"
                    // console.log("event tag", evt)
                    // console.log(this.state.position)
                    
                }
                if (this.state.banana === "peeled" && evt._targetInst.key === "peel-in-action"){
                    let peel = evt.nativeEvent
                    if (this.state.bananaX - this.state.barrelX < 5 && this.state.bananaY - this.state.barrelY < 5 ){
                                        this.setState({swipedToBarrel: true})
                                        this.props.setScore(1)
                                    }
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
                this.state = {
                    banana: 'full',
            swipedToBarrel: false,
            bananaPosition: new Animated.ValueXY({x: 5, y: 50}),
             barrelPosition: new Animated.ValueXY({ x: 1, y: 1 })
                }
    }


    
    render() {
        // console.log(this.state)
        {if (this.state.banana === 'full'){ 
        return(
            <Animated.View {...this._panResponder.panHandlers} style={this.styles}
                onPanResponderGrant >
                <Animated.View 
                // onLayout={({ nativeEvent }) => {
                //     console.log("barrel native", nativeEvent)
                //     this.setState({ barrelPosition: {X: nativeEvent.layout.x, y: nativeEvent.layout.y }})                }}
                   style = {this.state.barrelPosition.getLayout()}
                    >
                <Barrel  />
                </Animated.View>
                <Animated.View 
                // onLayout={({ nativeEvent }) => {
                //     this.setState({ bananaPosition: {x: nativeEvent.layout.x, y: nativeEvent.layout.y} })
                //     console.log("banana native", nativeEvent)
                // }}
                    style={this.state.bananaPosition.getLayout()}
                >
                <Banana onPanResponderGrant onStartShouldSetPanResponder/>
                </Animated.View>
            </Animated.View>
        )
    }}
        {if (this.state.banana === 'half'){ 
        return(
             <Animated.View {...this._panResponder.panHandlers} style={this.styles}>
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

            <Animated.View {...this._panResponder.panHandlers} style={this.styles} >
                <Animated.View 
                // onLayout={({ nativeEvent }) => {
                //     this.setState({ barrelPosition: { X: nativeEvent.layout.x, y: nativeEvent.layout.y } })
                // }}
                    style={this.state.barrelPosition.getLayout()}

                >
                    <Barrel />
                </Animated.View>
                    {!this.state.swipedToBarrel?
                    <Animated.View
                        // onLayout={({ nativeEvent }) => {
                        //     this.setState({ bananaPosition: { x: nativeEvent.layout.x, y: nativeEvent.layout.y } })
                        // }}
                        style={this.state.bananaPosition.getLayout()}

                    >
                        <Peel onPanResponderGrant />
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
            flex: 1
        
        }
    })
}




export default BananaComponent