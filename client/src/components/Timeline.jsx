import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'react-bootstrap';

function TimelineTest(props) {
  const events = props.events;
  render() {
      return (
        <div class="container">
          <div class="row">
            <div class="col">
              events[0][1]
            </div>
            <div class="col">
              events[0][0]
            </div>
          </div>
          <div class="row">
            <div class="col">
              events[1][1]
            </div>
            <div class="col">
              events[1][0]
            </div>
          </div>
          <div class="row">
            <div class="col">
              events[2][1]
            </div>
            <div class="col">
              events[2][0]
            </div>
          </div>
        </div>
      );
  }
}

export default TimelineTest(["success", "first"], ["pending", "second"], ["error", "third"])