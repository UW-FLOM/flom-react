import React, { Component } from 'react';
import { Typography, Layout } from 'antd';

import MapTool from '../components/MapTool';
import MapQuestion from '../components/MapQuestion';

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

export const featureFromGeometry = (geometry) => {
  if (geometry.type === 'polygon') {
    return {
      GISObject: {
        type: "polygon",
        data: geometry.geometry
      }
    };
  }
  return {};
};

class MapPage extends Component {
  constructor(prop) {
    super(prop);

    const storedGisDisplay = [];

    this.state = {
      questionID: this.props.activity.id,
      gisDisplay: storedGisDisplay,
      mode: "NONE",
    };

    this.fireDraw = this.fireDraw.bind(this);
    this.updateQuestionID = this.updateQuestionID.bind(this);
    this.changeGIS = this.changeGIS.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.activity !== this.props.activity) {
      this.setState({
        questionID: 0,
        mode: "NONE",
      });
      if (this.props.activity.function !== 'additional') {
        this.setState({
          gisDisplay: [],
        });
      }
    }
  }

  updateQuestionID(id) {
    this.setState({
      questionID: id,
    });
  }

  changeGIS(gis) {
    console.log(gis);
    let gisDisplay = [];
    gisDisplay[0] = gis;
    console.log(gisDisplay);
    this.setState({
      gisDisplay: gisDisplay,
    });
  }

  onFeatureDrawn = (featureGeometry) => {
    const id = this.state.questionID;

    this.props.onChange(id, featureFromGeometry(featureGeometry));

    let gis = this.state.gisDisplay;
    gis[id] = featureFromGeometry(featureGeometry);

    this.setState({
      gisDisplay: gis,
      mode: "NONE",
    });

    console.log(gis);
  }

  fireDraw() {
    this.setState({
      mode: "CREATE"
    });
  }

  render() {

    const {
      activity,
      values,
      mode,
      onChange
    } = this.props;

    return (
      <Layout
        style={{
          height: '100%',
          background: 'none',
        }}
      >
        <Sider
          style={{
            background: 'none',
            padding: '0 20px',
          }}
          width='400'
        >
          <Typography>
            <Title>{activity.title}</Title>
            <Paragraph>
              {activity.helpText}
            </Paragraph>
          </Typography>
          <MapQuestion
            key={activity.id}
            activity={activity}
            fireDraw={this.fireDraw}
            values={values}
            mode={this.state.mode}
            onChange={onChange}
            updateQuestionID={this.updateQuestionID}
            changeGIS={this.changeGIS}
            onFinish={this.props.onFinish}
          />
        </Sider>
        <Content
          style={{
            background: 'none',
          }}
        >
          <MapTool
            center={activity.center}
            zoomLevel={activity.zoomLevel}
            onFeatureDrawn={this.onFeatureDrawn}
            objects={Object.values(this.state.gisDisplay)}
            mode={this.state.mode}
          />
        </Content>
      </Layout>
    );
  }
}

export default MapPage;
