import { useGetHomeDataQuery } from "../../../redux/features/Dashboard/homeApi";
import Summary from "./Summary";
import UpcomingInspections from "./UpcomingInspections";


const Dashboard = () => {  
    const {data} = useGetHomeDataQuery(undefined)   
    const homeData = data?.data
    return (
        <div className="">
            <Summary homeData={homeData} /> 
            <UpcomingInspections homeData={homeData} />
        </div>
    );
};

export default Dashboard;
