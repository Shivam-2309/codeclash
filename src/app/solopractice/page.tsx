"use client";
import React, { useState } from 'react';
import NavigationUser from '../components/NavigationUser';

const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
const tags = ['arrays', 'linked list', 'graphs', 'dp', 'heaps', 'stacks', 'queues'];

type Problem = {
  contestId: number;
  index: string;
  name: string;
  rating?: number;
  tags: string[];
};

const page = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProblems = async (rating: number) => {
    setLoading(true);
    setProblems([]);
    // The API returns lots of problems, so we'll filter by rating client-side
    const response = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await response.json();
    // Filter by rating
    const filtered = data.result.problems.filter((p: any) => p.rating === rating);
    setProblems(filtered);
    setLoading(false);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    fetchProblems(rating);
  };

  return (
    <div className="p-6">
      <NavigationUser />

      <h1 className="text-2xl font-bold mt-6">Let's start practicing!</h1>
      <p className="mt-2 mb-4 text-gray-700">Choose the rating of the problem.</p>

      <div className="grid grid-cols-5 gap-4 w-full mb-10">
        {ratings.map((rating) => (
          <div
            key={rating}
            className={`border border-gray-300 rounded-md text-center font-medium cursor-pointer flex items-center justify-center transition
            ${selectedRating === rating ? 'bg-indigo-300' : 'hover:bg-indigo-200'}`}
            style={{ height: '60px' }}
            onClick={() => handleRatingClick(rating)}
          >
            {rating}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">
        Select the tag of the problem statement you want to practice.
      </h2>

      <div className="grid grid-cols-5 gap-4 w-full mb-10">
        {tags.map((tag) => (
          <div
            key={tag}
            className="border border-gray-300 rounded-md text-center font-medium cursor-pointer hover:bg-indigo-200 transition flex items-center justify-center"
            style={{ height: '60px' }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Problems List */}
      {selectedRating && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Problems with rating {selectedRating}
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {problems.length === 0 ? (
                <p>No problems found for this rating.</p>
              ) : (
                <ul className="space-y-2">
                  {problems.map((problem) => (
                    <li
                      key={`${problem.contestId}${problem.index}`}
                      className="border p-4 rounded transition hover:bg-gray-100"
                    >
                      <a
                        href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline"
                      >
                        {problem.name}
                      </a>
                      <span className="ml-4 text-gray-600">[{problem.tags.join(', ')}]</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
