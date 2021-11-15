import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs'; //get logos from here
import { Result, Button } from 'antd';

function Result({
  itemstatus, itemtitle, itemintro
}) {
  return (
    <div>
      <Result
        status= {itemstatus}
        title= {itemtitle}
        subTitle= {itemintro}
      />
    </div>
  );
}

export default Result;
