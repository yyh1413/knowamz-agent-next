import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import React from "react";
import { Form, Input, message, Modal, Select } from 'antd';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setRow: (category: any) => void;
  showModal: () => void;
  searchType: any[]
}
const SearchBar: FC<SearchBarProps> = ({ setSearchQuery, setCategory, searchType, showModal, setRow }) => {

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex flex-row items-center gap-2 py-2">
      <div className="flex w-full flex-grow space-x-2">
        <input
          type="search"
          className="flex-grow rounded-md border border-white/20 bg-zinc-900 py-1 text-white placeholder-white shadow-sm focus:border-white focus:outline-none focus:ring-white"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          onChange={handleSearchChange}
        />

      </div>
      <div className="block  rounded-md border border-white/20 bg-zinc-900 px-2 py-1 text-white shadow-sm focus:border-white focus:outline-none focus:ring-white sm:text-sm">
        <button onClick={() => { showModal(); setRow(undefined) }}>Add</button>

      </div>
      <div className="w-full sm:w-auto">
        <select
          id="category"
          name="category"
          className="block w-full rounded-md border border-white/20 bg-zinc-900 px-2 py-1 text-white shadow-sm focus:border-white focus:outline-none focus:ring-white sm:text-sm"
          onChange={handleCategoryChange}
        >
          <option value={''}>All</option>
          {searchType.map(v => (<option value={v} key={v}>{v}</option>))}

        </select>
      </div>

    </div>
  );
};

export default SearchBar;
