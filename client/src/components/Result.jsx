import React from 'react';
import { BsFillCheckCircleFill, BsFillExclamationCircleFill, BsFillExclamationTriangleFill } from 'react-icons/bs'; //get logos from here

function Result({
  itemstatus, itemtitle, itemintro
}) {
  if ({ itemstatus } === "success") {
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
      <h1>{ itemtitle }</h1>
      <h1>{ itemintro }</h1>
    );
  } else if ({ itemstatus } === "error") {
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
      <h1>{ itemtitle }</h1>
      <h1>{ itemintro }</h1>
    );
  }

      if ({ itemstatus } === "success") {
        
      
        <BsFillExclamationTriangleFill
          style={{
            fontSize: '72px',
            color: '#52c41a',
          }}
        />
      } else if ({ itemstatus } === "info") {
        <BsFillExclamationCircleFill
          style={{
            fontSize: '72px',
            color: '#52c41a',
          }}
        />
      } else if ({ itemstatus } === "warning") {
        <BsFillExclamationCircleFill
          style={{
            fontSize: '72px',
            color: '#52c41a',
          }}
        />
      } 
      <h1>{ itemtitle }</h1>
      <h1>{ itemintro }</h1>
    </div>
  );
}

export default Result;
