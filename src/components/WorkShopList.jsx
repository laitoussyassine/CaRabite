// import React from 'react';

// const WorkshopList = ({ workshops, totalPages, currentPage, onPageChange }) => {
//   return (
//     <div>
//       <h2>Search Results:</h2>
//       {workshops.map((workshop) => (
//         <div key={workshop._id}>
//           <h3>{workshop.workshopName}</h3>
//           <p>City: {workshop.city.name}</p>
//           <p>Address: {workshop.address}</p>
//           <p>Services: {workshop.services.join(', ')}</p>
//           {/* Add more details as needed */}
//         </div>
//       ))}
//       <div>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
//           <button key={pageNum} onClick={() => onPageChange(pageNum)}>
//             {pageNum}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkshopList;
