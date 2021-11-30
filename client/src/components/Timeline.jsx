import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'react-bootstrap';

function TimelineTest(events) {
  return (
      <div>
        <h1>Test Timeline</h1>
        <div class="container">
          <div class="row">
            <div class="col">
                "{events[0]}"
            </div>
            <div class="col">
                events[0][1]
            </div>
          </div>
          <div class="row">
            <div class="col">
                {events[1]}
            </div>
            <div class="col">
                {events[1]}
            </div>
          </div>
          <div class="row">
            <div class="col">
                {events[2]}
            </div>
            <div class="col">
                {events[2]}
            </div>
          </div>
        </div>
      </div>
  );
}

export default TimelineTest