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
    dispatch(fetchWorkshops());
  }, []);

  return (
    <>
      <section>
        <div className="mx-28">
            <div className='text-center mt-10'>
                {loading && <GridLoader  color="#032098"  />}
            </div>
          {message && <h3>{message}</h3>}
          {!loading && !message && (
            <div className="w-fit mx-auto grid grid-cols-8 justify-items-center justify-center gap-y-20 gap-x-14 mt-20 mb-5">
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
