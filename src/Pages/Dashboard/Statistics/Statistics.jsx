import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Chart from 'react-apexcharts'
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Statistics = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allbookings = [], isPending } = useQuery({
        queryKey: ['allbookings'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBookings')
            console.log(res.data);
            return res.data
        }
    })

    const countByDate = {};

    allbookings.forEach((booking) => {
        const date = booking.bookingDate;

        // If the date is not in the countByDate object, initialize it to 1
        if (!countByDate[date]) {
            countByDate[date] = 1;
        } else {
            // If the date is already in the countByDate object, increment the count
            countByDate[date]++;
        }
    });

    console.log('count bay date', countByDate);
    const valuesArrayOfCountBookings = Object.values(countByDate);
    console.log(valuesArrayOfCountBookings);
    const datesOfBookings = [];

    const dates = allbookings.map(booking => {
        booking.bookingDate && datesOfBookings.push(booking.bookingDate)
    });
    console.log('dates', dates);
    const filteringOutDuplicate = new Set(datesOfBookings)
    const finalDate = [...filteringOutDuplicate];


    const [options, setOptions] = useState({
        chart: {
            id: 'apexchart-example',
        },
        xaxis: {
            categories: finalDate
        }
    });
    const [series, setSeries] = useState([{
        name: 'series-1',
        data: valuesArrayOfCountBookings
    }]);

    if (isPending) {
        return <h1 className="flex justify-center items-center">Loading...</h1>
    }


    return (
        <Chart options={options} series={series} type="bar" width={800} height={500} />
    );
}
export default Statistics;