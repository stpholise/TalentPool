import Marker from "../assets/marker.svg";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from '../store'

const JobDetail = () => {
  const { id } = useParams();

  const created = useSelector((state: RootState) => state.jobSlice.created);
  const location = useSelector((state: RootState) => state.jobSlice.location);
  const description = useSelector((state: RootState) => state.jobSlice.description);

  const title = useSelector((state: RootState) => state.jobSlice.title);
  const category = useSelector((state: RootState) => state.jobSlice.category);
  const company = useSelector((state: RootState) => state.jobSlice.company);
  const contract_type = useSelector((state: RootState) => state.jobSlice.contract_type);
  const salary_min = useSelector((state: RootState) => state.jobSlice.salary_min);
  const salary_max = useSelector((state: RootState) => state.jobSlice.salary_max);

  const handleTimeDifference = (created: string) => {
    const today = new Date();
    const createdAt = new Date(created);
    const timeDifference = today.getTime() - createdAt.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  return (
    <>
      <main className="dashboard">
        {
          <div className="successWrapper jobDetail">
            <section className="jobDetailTop bbottom">
              <h2> {title}</h2>
              <div className="topFlex">
                <div className="companyCont">
                  <h4 className="companyName "> {company.display_name}</h4>
                  <h5> {location.area[location.area.length - 1]} </h5>
                  {salary_min && salary_max && (
                    <h5 className="category">
                      {" "}
                      Salary: £{salary_min} - £{salary_max}{" "}
                    </h5>
                  )}
                </div>
                <div className="applyBtns">
                  <Link to={`/jobs/${id}/apply`} className="applyLink blueBg">
                    <button>Apply with TalentPool</button>
                  </Link> 
                </div>
                <div className="locationCont companyCont">
                  <h3>Location</h3>
                  <h5>
                    {" "}
                    <img src={Marker} alt="" style={{ width: "15px" }} />{" "}
                    {location.display_name}{" "}
                  </h5>
                </div>
              </div>
              <div className="location"></div>
            </section>

            <section className="jobDetailDescription bbottom">
              <h3> Job Description</h3>
              <p>{description}</p>
            </section>

            <section className="jobDetailfooter  bbottom">
              <h5 className="category"> Category: {category?.label} </h5>

              {contract_type && (
                <h5 className="category"> Job Type: {contract_type} </h5>
              )}
              <h5> posted {handleTimeDifference(created)} days ago</h5>
            </section>
          </div>
        }
      </main>
    </>
  );
};

export default JobDetail;
