import Taxonomy from "../components/Taxonomy"; //Importing custom component
import CurrentAnnotations from "../components/CurrentAnnotations"; //Importing custom component
import ToolBox from "../components/ToolBox"; //Importing custom component
import ImageViewer from "../components/ImageViewer"; //Importing custom component
import AIpipeline from "../components/AIpipeline"; //Importing custom component
import ResizePanel from "react-resize-panel"; //Importing resize panel component
import style from "./Dashboard.css"; //Importing CSS file
import classNames from "classnames/bind"; //Importing classnames
import VideoViewer from "../components/VideoViewer"; //Importing custom component
import DwvComponent from "../components/DICOMViewer/DwvComponent"; //Importing custom component
import { //Importing icons from Material-UI library
  AccountTree,
  AddBox,
  FolderOpen,
  Fullscreen,
  FullscreenExit,
  Image,
  RateReview,
  SaveAlt,
  Videocam,
} from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save"; //Importing icon from Material-UI library
import { Tooltip } from "@material-ui/core"; //Importing tooltip component from Material-UI library
import { ManageAccounts, ViewInAr } from "@mui/icons-material"; //Importing icons from MUI library
import { useState } from "react";

let cx = classNames.bind(style); //Binding classnames to the imported CSS file

function Dashboard() { //Defining functional component
  const [leftMenu, toggleLeftMenu] = useState(true); //Defining state variables using useState hook
  const [rightMenu, toggleRightMenu] = useState(true);
  const [bottomMenu, toggleBottomMenu] = useState(true);
  const [selectedViewer, setSelectedViewer] = useState("Image Viewer");
  const [selectedTool, setSelectedTool] = useState("Rectangle");
  const [annotationList, setAnnotationList] = useState([]);
  const [selectedRectIndex, setSelectedRectIndex] = useState(null);
  const [selectedAnnotationValue, setSelectedAnnotationValue] = useState(null);

  const handleSelectViewerChange = (event) => { //Defining a function to handle changes in the selected viewer
    setSelectedViewer(event.target.value); //Updating the state variable for selected viewer
  };

  return ( //Returning JSX
    <div>
      <div className={cx("body")}>
        {leftMenu && (
          <ResizePanel direction="e" style={{}}>
            <div className={cx("sidebarLeft", "panel")}>
              <Tooltip title="Project Managemnet">
                <AccountTree className="mt-4" />
              </Tooltip>
              <Tooltip title="User Managemnet">
                <ManageAccounts className="mt-4" />
              </Tooltip>
              <Tooltip title="New Project">
                <AddBox className="mt-5" />
              </Tooltip>
              <Tooltip title="Open Project">
                <FolderOpen className="mt-4" />
              </Tooltip>
              <Tooltip title="Save Project">
                <SaveIcon className="mt-4" />
              </Tooltip>
              <Tooltip title="Download Image">
                <SaveAlt className="mt-4" />
              </Tooltip>
              {/* Fullscreen view */}
              <Tooltip title="Fullscreen View">
                <Fullscreen
                  onClick={() => {
                    toggleRightMenu(false);
                    toggleBottomMenu(false);
                  }}
                  className="mt-5"
                />
              </Tooltip>
              {/* Complete view */}
              <Tooltip title="Complete View">
                <FullscreenExit
                  onClick={() => {
                    toggleRightMenu(true);
                    toggleBottomMenu(true);
                  }}
                  className="mt-4"
                />
              </Tooltip>
              {/* Annotation view */}
              <Tooltip title="Annotation View">
                <RateReview
                  onClick={() => {
                    toggleRightMenu(true);
                    toggleBottomMenu(false);
                  }}
                  className="mt-4"
                />
              </Tooltip>
              {/* Select Image viewer */}
              <Tooltip title="Image Viewer">
                <Image
                  onClick={() => setSelectedViewer("Image Viewer")}
                  className="mt-5"
                />
              </Tooltip>
              {/* Select Video viewer */}
              <Tooltip title="Video Viewer">
                <Videocam
                  onClick={() => setSelectedViewer("Video Viewer")}
                  className="mt-4"
                />
              </Tooltip>
              {/* Select DICOM viewer */}
              <Tooltip title="DICOM Viewer">
                <ViewInAr
                  onClick={() => setSelectedViewer("DICOM Viewer")}
                  className="mt-4"
                />
              </Tooltip>
            </div>
          </ResizePanel>
        )}
        {/* Toggle Left Menu */}
        <div style={{ background: "white" }}>
          <button onClick={() => toggleLeftMenu(!leftMenu)}>
            {leftMenu && "⇦"}
            {!leftMenu && "⇨"}
          </button>
        </div>
        {/* Select Image Viewer */}
        <div className={cx("content", "panel")}>
          {selectedViewer == "Image Viewer" && (
            <ImageViewer
              selectedTool={selectedTool}
              setAnnotationList={setAnnotationList}
              selectedRectIndex={selectedRectIndex}
              setSelectedRectIndex={setSelectedRectIndex}
            />
          )}
          {/* Select Video Viewer */}
          {selectedViewer == "Video Viewer" && <VideoViewer />}
          {/* Select DICOM Viewer */}
          {selectedViewer == "DICOM Viewer" && <DwvComponent />}
        </div>
        {/* Toggle Right Menu */}
        <div style={{ background: "white" }}>
          <button onClick={() => toggleRightMenu(!rightMenu)}>
            {rightMenu && "⇨"}
            {!rightMenu && "⇦"}
          </button>
        </div>
        {rightMenu && (
          <ResizePanel
            direction="w"
            style={{ width: "400px" }}
            handleClass={style.customHandle}
            borderClass={style.customResizeBorder}
          >
            {/* Taxonomy component */}
            <div className={cx("sidebarRight", "panel")}>
              <Taxonomy
                setSelectedAnnotationValue={setSelectedAnnotationValue}
              />
              {/* Live Annotations component */}
              <CurrentAnnotations
                annotationList={annotationList}
                setAnnotationList={setAnnotationList}
                selectedRectIndex={selectedRectIndex}
                setSelectedRectIndex={setSelectedRectIndex}
                selectedAnnotationValue={selectedAnnotationValue}
                selectedTool={selectedTool}
              />
              {/* ToolBox component */}
              <ToolBox
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            </div>
          </ResizePanel>
        )}
      </div>
      <div>
        {/* Toggle AI/CV Menu */}
        <div>
          <button onClick={() => toggleBottomMenu(!bottomMenu)}>
            {bottomMenu && "⇩"}
            {!bottomMenu && "⇧"}
          </button>
        </div>
        {bottomMenu && (
          <ResizePanel direction="n" style={{ height: "200px" }}>
            <div style={{ justifyContent: 'center' }} className={cx("footer", "panel")}>
              <AIpipeline />
            </div>
          </ResizePanel>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
