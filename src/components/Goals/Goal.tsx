import { useState } from "react";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import GoalsForm from "./GoalsForm";
import { Button } from "react-bootstrap";

interface GoalItem {
  id: number;
  text: string;
  category: string;
}

interface GoalProps {
  goals: GoalItem[];
  removeGoal: (id: number) => void;
  updateGoal: (id: number, newGoal: GoalItem) => void;
}

const Goal: React.FC<GoalProps> = ({ goals, removeGoal, updateGoal }) => {
  const [edit, setEdit] = useState<{ id: number | null; text: string }>({
    id: null,
    text: "",
  });

  const [pageNum, setPageNum] = useState<number>(0);
  const goalsPerPage: number = 5;
  const pagesVisited: number = pageNum * goalsPerPage;
  const pageCount: number = Math.ceil(goals.length / goalsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNum(selected);
  };

  const submitGoalUpdate = (updatedGoal: GoalItem) => {
    updateGoal(updatedGoal.id, updatedGoal);
    setEdit({
      id: null,
      text: "",
    });
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
          <BiEdit
            style={{ fontSize: "25px" }}
            onClick={() => setEdit({ id: goal.id, text: goal.text })}
          />
          <RiCloseCircleLine
            style={{ color: "#d12c2c", fontSize: "25px" }}
            onClick={() => removeGoal(goal.id)}
          />
        </div>
      </div>
    ));

  return (
    <>
      {edit.id !== null && (
        <div className="edit-goal mt-5" style={{ width: "325px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            Edit your goal ({edit.text}):
          </span>
          <GoalsForm
            title="Edit your goal:"
            placeholder="Enter new title"
            buttonText="SAVE EDIT"
            editGoal={edit}
            onSubmit={submitGoalUpdate}
          />
          <Button
            variant="secondary"
            onClick={() => setEdit({ id: null, text: "" })}
            style={{ width: "325px", marginTop: "-40px" }}
          >
            DISCARD CHANGES
          </Button>
        </div>
      )}

      {edit.id === null && (
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
      )}
    </>
  );
};

export default Goal;
