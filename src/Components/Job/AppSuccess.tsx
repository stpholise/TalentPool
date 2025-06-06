import Check from "../../assets/check-01.svg";
import { useNavigate } from "react-router-dom";
import Success from "../../assets/success.svg";

interface UserInfo {
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

const AppSuccess = ({ userInfo }: UserInfo) => {
  const navigate = useNavigate();

  return (
    <div className="successContainer">
      <div className="successWrapper">
        <div className="centerHeading">
          <img src={Success} alt="" className="successImg" />
          <h2> Your application has been submitted! </h2>
        </div>
        <div className="successStatus">
          <img src={Check} alt="check" className="checkIcon" />
          <div>
            <p>
              {" "}
              <p className="stausText">
                You will get an email confirmation at
              </p>{" "}
              {userInfo ? userInfo.email : ""}
            </p>
          </div>
        </div>

        <button className="successBtn" onClick={() => navigate("/jobs")}>
          Return to job search
        </button>
      </div>
    </div>
  );
};

export default AppSuccess;
