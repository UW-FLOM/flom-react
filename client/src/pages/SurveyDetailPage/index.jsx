import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import JSONViewer from 'react-json-viewer';
import user from '../../services/user';
import { Menu } from '../../components/Menu';

const dataExport = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
    const link = document.createElement("a");
        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    link.dispatchEvent(evt);
    link.remove()
};

function SurveyDetailPage(props) {
  const [content, setContent] = useState([]);
  const { surveyId } = useParams();
  useEffect(() => {
    user.surveyDetail(surveyId).then(
      (response) => {
            setContent(response.data);
            console.log(response);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);


  if (!content[0]) { return null; }
  return (
    <>
        <Menu />
        <button type="button" onClick={() => dataExport("Export.json", content[0])}>Export</button>
        <JSONViewer json={content[0]} />
    </>
  );
}

export default SurveyDetailPage;
