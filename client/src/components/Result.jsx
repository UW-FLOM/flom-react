import React from 'react';
import { BsFillCheckCircleFill, BsFillExclamationCircleFill, BsFillExclamationTriangleFill } from 'react-icons/bs'; //get logos from here

function Result({
  itemstatus, itemtitle, itemintro
}) {
  return (
    <h1>test</h1>
    /*
    <div>
      {(() => {
        if ( { itemstatus } === "success" ) {
          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <BsFillCheckCircleFill
                style={{
                  fontSize: '72px',
                  color: '#52c41a',
                }}
              />
            </div>
          )
        } else if ( { itemstatus } === "error" ) {
          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <BsFillExclamationTriangleFill
                style={{
                  fontSize: '72px',
                  color: '#52c41a',
                }}
              />
            </div>
          )
        } else if ( { itemstatus } === "info" ) {
          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <BsFillExclamationCircleFill
                style={{
                  fontSize: '72px',
                  color: '#52c41a',
                }}
              />
            </div>
          )
        } else if ( { itemstatus } === "warning" ) {
          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <BsFillExclamationCircleFill
                style={{
                  fontSize: '72px',
                  color: '#52c41a',
                }}
              />
            </div>
          )
        } 
      })()}
    </div>
  */
  );
}

export default Result;
