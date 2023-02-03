import React from "react";
import { Spring } from "react-spring";

interface IVerticalProps{
progress? : any
percent ? : any
className ? : any
}

const VerticalProgress = (props:IVerticalProps) => {
  return (
    <Spring from={{ percent: 0 }} to={{ percent: props.progress }}>
      {() => (
        <div className={props.className}>
          <div style={{ height: `${props.percent}%` }} className="progress-bar">
            <span className="sr-only">{`${props.progress}%`}</span>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default VerticalProgress;
