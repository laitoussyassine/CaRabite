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
  useEffect(() => {
    handleSearch()
  },[])
  
  return (
    <>
      <section className="mt-5 min-h-screen">
        <div className="container text-center">
          <h2 className="heading font-bold text-xl">Find a Workshop</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff15] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder-textColor border-none"
              placeholder="Search Workshop By City "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleSearch} className="h-14 w-20 mt-0 rounded-sm bg-mainColoe">
              Search
            </Button>
          </div>
        </div>
        {workshops.length > 0 ? (
            <WorkshopList workshops={workshops} loading={loading} message={message} />
            ) : (
              <div className="text-center mt-4">
              No workshops found in {query}. Try searching for a different city.
              <WorkshopList workshops={workshops} loading={loading} message={message} />
            </div>
          )}
      </section>
    </>
  );
};
export default WorkshopsPage;