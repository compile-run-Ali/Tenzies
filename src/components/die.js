import React from "react";

export default function Die(props){
    const styles={
        backgroundColor: props.isheld? "#59E391": "white",
    }
    return(
        <div onClick={()=>props.hold(props.id)} className="die" style={styles}>
                <h1>{props.value}</h1>
        </div>
    )
}