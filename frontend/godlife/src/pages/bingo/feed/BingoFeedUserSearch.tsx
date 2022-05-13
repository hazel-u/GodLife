import React, { useState } from "react";

import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";

const BingoFeedUserSearch = ({
  setBingoList,
}: {
  setBingoList: React.Dispatch<React.SetStateAction<BingoType[]>>;
}) => {
  const [searchInput, setSearchInput] = useState("");

  const searchUser = (nickName: string) => {
    if (nickName) {
      axiosWithToken
        .get(`feed/search/user/${nickName}`)
        .then((res) => {
          setBingoList(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axiosWithToken
        .get(`feed`)
        .then((res) => {
          setBingoList(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <input
      value={searchInput}
      onChange={(e: { target: { value: string } }) => {
        setSearchInput(e.target.value);
        searchUser(e.target.value);
      }}
      type="text"
      placeholder="갓생러 검색"
      className="feed-user-search"
    />
  );
};

export default BingoFeedUserSearch;
