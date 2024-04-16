import React, { useState } from 'react';
import collegeData from '../data.json';

const CollegeTable = () => {
  const [colleges, setColleges] = useState(collegeData);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const sortData = (key, order) => {
    const sortedColleges = [...colleges].sort((a, b) => {
      if (order === 'asc') {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setColleges(sortedColleges);
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortBy(null);
      setColleges([...collegeData]);
    } else {
      setSortBy(key);
      sortData(key, 'asc');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredColleges = colleges.filter(college =>
    college.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setPerPage(prevPerPage => prevPerPage + 10);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      loadMore();
    }
  };

  return (
    <div className="overflow-x-auto" style={{ maxHeight: '600px', overflowY: 'scroll' }} onScroll={handleScroll}>
      <input type="text" placeholder="Search by college name" onChange={handleSearch} className="mb-4 p-2 border border-gray-300" />
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300" onClick={() => handleSort('cdRank')}>CD Rank</th>
            <th className="border border-gray-300" onClick={() => handleSort('college')}>College</th>
            <th className="border border-gray-300" onClick={() => handleSort('courseFees')}>Course Fees</th>
            <th className="border border-gray-300" onClick={() => handleSort('placement')}>Placement</th>
            <th className="border border-gray-300" onClick={() => handleSort('userReview')}>User Review</th>
            <th className="border border-gray-300" onClick={() => handleSort('rankingUpdate')}>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.slice(0, perPage).map(college => (
            <tr key={college.id}>
              <td className="border border-gray-300">{college.cdRank}</td>
              <td className="border border-gray-300">{college.college}</td>
              <td className="border border-gray-300">{college.courseFees}</td>
              <td className="border border-gray-300">{college.placement}</td>
              <td className="border border-gray-300">{college.userReview}</td>
              <td className="border border-gray-300">{college.ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;

