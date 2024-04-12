import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import WorkshopList from '@/components/workshops/WorkshopList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkshops } from '@/store/features/workshop/workshopAction';
import { useEffect } from 'react';

const WorkshopsPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { loading, workshops, message } = useSelector((state) => state.workshops);

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      dispatch(fetchWorkshops(trimmedQuery));
    }
  };

  
  return (
    <div>
      <section className="mt-5">
        <div className="container text-center">
          <h2 className="heading">Find a Workshop</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder-textColor"
              placeholder="Search Workshop"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleSearch} className="h-full mt-0 rounded-r-md">
              Search
            </Button>
          </div>
        </div>
      </section>
      <WorkshopList workshops={workshops} loading={loading} message={message} />
    </div>
  );
};

export default WorkshopsPage;
