import { BsFillCheckCircleFill, BsFillExclamationCircleFill, BsFillExclamationTriangleFill } from 'react-icons/bs'; //get logos from here

function Result(status, title, intro) {
  let comp;

  if ( { status } === "success" ) {
    comp = (
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
  } else if ( { status } === "error" ) {
    comp = ( 
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
  } else if ( { status } === "info" ) {
    comp = (
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
  } else if ( { status } === "warning" ) {
    comp = (
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
  
  return (
    <div>
      { status, title, intro }
    </div>
  );
}

export default Result;
