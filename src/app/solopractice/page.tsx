"use client";
import React, { useState } from 'react';
import NavigationUser from '../components/NavigationUser';

const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
const PROBLEMS_PER_PAGE = 20;

type Problem = {
  contestId: number;
  index: string;
  name: string;
  rating?: number;
  tags: string[];
};

const page = () => {
  const [minRating, setMinRating] = useState<number>(800);
  const [maxRating, setMaxRating] = useState<number>(2000);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [rangeSelected, setRangeSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProblems = async () => {
    setLoading(true);
    setProblems([]);
    setAllTags([]);
    setSelectedTag(null);
    setCurrentPage(1);
    // fetch all problems
    const response = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await response.json();
    // filter problems by range
    const filtered = data.result.problems.filter(
      (p: any) =>
        typeof p.rating === 'number' &&
        p.rating >= minRating &&
        p.rating <= maxRating
    );
    setProblems(filtered);

    // extract unique tags from filtered problems
    const tagsSet = new Set<string>();
    filtered.forEach((p: any) => {
      p.tags.forEach((tag: string) => tagsSet.add(tag));
    });
    setAllTags(Array.from(tagsSet));

    setLoading(false);
  };

  const handleRangeSelect = () => {
    setRangeSelected(true);
    fetchProblems();
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1); // reset to first page of tag selection
  };

  // Filter problems by the selected tag if it exists
  const filteredProblems = selectedTag
    ? problems.filter((problem) => problem.tags.includes(selectedTag))
    : problems;

  // Pagination calculations
  const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * PROBLEMS_PER_PAGE;
  const endIdx = startIdx + PROBLEMS_PER_PAGE;
  const pageProblems = filteredProblems.slice(startIdx, endIdx);

  return (
    <div className="p-6">
      <NavigationUser />

      <h1 className="text-2xl font-bold mt-6">Let's start practicing!</h1>
      <p className="mt-2 mb-4 text-gray-700">Select the range of problem ratings.</p>

      <div className="flex items-center space-x-4 mb-8">
        <label className="font-medium">Min Rating: </label>
        <select
          value={minRating}
          onChange={e => setMinRating(Number(e.target.value))}
          className="border rounded px-2 py-1">
          {ratings.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <label className="font-medium">Max Rating: </label>
        <select
          value={maxRating}
          onChange={e => setMaxRating(Number(e.target.value))}
          className="border rounded px-2 py-1">
          {ratings.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <button
          className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-600 transition"
          onClick={handleRangeSelect}>
          Get Problems
        </button>
      </div>

      {rangeSelected && minRating <= maxRating && (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-4">
            Select the tag of the problem statement you want to practice.
          </h2>
          <div className="grid grid-cols-5 gap-4 w-full mb-10">
            {allTags.length ? (
              allTags.map((tag) => (
                <div
                  key={tag}
                  className={`border border-gray-300 rounded-md text-center font-medium cursor-pointer flex items-center justify-center transition
                  ${selectedTag === tag ? 'bg-indigo-300' : 'hover:bg-indigo-200'}`}
                  style={{ height: '60px' }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))
            ) : (
              <p className="col-span-5 text-gray-500 text-center">Loading tags...</p>
            )}
          </div>
        </>
      )}

      {minRating > maxRating && (
          <div>kya krte ho bhai</div>
         ) 
      }

      {rangeSelected && (minRating <= maxRating) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Problems with rating {minRating} to {maxRating}
            {selectedTag ? ` and tag '${selectedTag}'` : ""}
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {filteredProblems.length === 0 ? (
                <p>No problems found for this rating range/tag.</p>
              ) : (
                <>
                  <ul className="space-y-2">
                    {pageProblems.map((problem) => (
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
                  {/* Pagination Controls */}
                  <div className="flex items-center justify-center space-x-4 mt-8">
                    <button
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-indigo-500 text-white hover:bg-indigo-600"} transition`}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`px-3 py-2 rounded ${currentPage === totalPages || totalPages === 0 ? "bg-gray-300" : "bg-indigo-500 text-white hover:bg-indigo-600"} transition`}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
