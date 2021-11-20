import { BsFillCheckCircleFill } from 'react-icons/bs';

function Result() {
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
  );
}

export default Result;
