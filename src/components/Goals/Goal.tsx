import { useState } from "react";
import ReactPaginate from "react-paginate";
import { RiCloseCircleLine } from "react-icons/ri";

interface GoalItem {
  id: number;
  text: string;
  category: string;
}

interface GoalProps {
  goals: GoalItem[];
  removeGoal: (id: number) => void;
}

const Goal: React.FC<GoalProps> = ({ goals, removeGoal }) => {
  const [pageNum, setPageNum] = useState<number>(0);
  const goalsPerPage: number = 5;
  const pagesVisited: number = pageNum * goalsPerPage;
  const pageCount: number = Math.ceil(goals.length / goalsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNum(selected);
  };

  const displayGoals = goals
    .slice(pagesVisited, pagesVisited + goalsPerPage)
    .map((goal) => (
      <div
        key={goal.id}
        style={{
          margin: "10px 0",
          width: "325px",
          backgroundColor: "#fff",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        <span>{goal.text}</span>
        <div>
          <RiCloseCircleLine
            style={{ color: "#d12c2c", fontSize: "25px" }}
            onClick={() => removeGoal(goal.id)}
          />
        </div>
      </div>
    ));

  return (
    <>
      <div>{displayGoals}</div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        pageClassName={"pagination-item"}
        activeClassName={"pagination-active"}
        nextClassName={"pagination-button"}
        previousClassName={"pagination-button"}
        pageRangeDisplayed={3}
      />
    </>
  );
};

export default Goal;
