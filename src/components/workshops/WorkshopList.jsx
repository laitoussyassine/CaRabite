import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkshops } from '../../store/features/workshop/workshopAction';
import WorkshopCard from './WorkshopCard';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

const WorkshopList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select workshops state from Redux store
  const { workshops, loading, message } = useSelector((state) => state.workshops);
  console.log(workshops);

  useEffect(() => {
    // Dispatch fetchWorkshops action to fetch workshops data
    dispatch(fetchWorkshops());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="mx-28">
            <div className='text-center mt-10'>
                {loading && <GridLoader  color="#032098"  />}
            </div>
          {message && <h3>{message}</h3>}
          {!loading && !message && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop._id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WorkshopList;
