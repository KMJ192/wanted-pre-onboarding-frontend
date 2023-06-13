import { useState } from "react";

function useUpdateTodo() {
  const [updateIdx, setUpdateIdx] = useState(-1);

  const onClickUpdate = (idx: number) => {
    setUpdateIdx(idx);
  };

  return {
    updateIdx,
    onClickUpdate,
  };
}

export default useUpdateTodo;
