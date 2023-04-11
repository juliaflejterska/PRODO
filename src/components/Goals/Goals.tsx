import React, { useState, useEffect } from "react";
import Select from "react-select";

import GoalsForm from "./GoalsForm";
import Goal from "./Goal";

interface GoalItem {
  id: number;
  text: string;
  category: string;
}

interface Props {}

const Goals: React.FC<Props> = () => {
  const sortCategories = [
    { value: "all", label: "all" },
    { value: "self-development", label: "self-development" },
    { value: "self-care", label: "self-care" },
    { value: "work/school", label: "work/school" },
    { value: "other", label: "other" },
  ];

  const [selectedSortCategory, setSelectedSortCategory] = useState(
    sortCategories[0].value
  );

  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<GoalItem[]>([]);

  useEffect(() => {
    const goalsFromLS = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(goalsFromLS);
  }, []);

  useEffect(() => {
    if (selectedSortCategory === "all") {
      setSelectedGoals([...goals]);
    } else {
      const isCategory = (goal: GoalItem) => {
        return goal.category === selectedSortCategory;
      };
      setSelectedGoals([...goals].filter(isCategory));
    }
  }, [selectedSortCategory, goals]);

  const changeSortCategory = (
    newValue: { value: string; label: string } | null
  ) => {
    if (newValue) {
      setSelectedSortCategory(newValue.value);
    }
  };

  const addGoal = (goal: GoalItem) => {
    if (!goal.text || /^\s*$/.test(goal.text)) return;

    const newGoals = [goal, ...goals];

    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  const removeGoal = (id: number) => {
    const removeArray = [...goals].filter((goal) => goal.id !== id);
    setGoals(removeArray);
    localStorage.setItem("goals", JSON.stringify(removeArray));
  };

  const updateGoal = (goalId: number, newGoal: GoalItem) => {
    const editedGoals = [...goals].map((goal) =>
      goal.id === goalId ? newGoal : goal
    );
    setGoals(editedGoals);
    localStorage.setItem("goals", JSON.stringify(editedGoals));
  };

  return (
    <>
      <div
        className="mb-5 d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1580637250481-b78db3e6f84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="my-5">GOALS</h1>
        <GoalsForm
          title="NEW GOAL"
          placeholder="Enter title"
          buttonText="ADD NEW GOAL"
          onSubmit={addGoal}
        />
      </div>

      <div
        className="mb-5 d-flex flex-column justify-content-center align-items-center text-center"
        style={{ width: "100%" }}
      >
        <label className="mb-4" style={{ fontSize: "20px", fontWeight: "600" }}>
          Sort by category:
        </label>
        <Select
          value={sortCategories.find(
            (category) => category.value === selectedSortCategory
          )}
          options={sortCategories}
          onChange={changeSortCategory}
          styles={{
            control: (provided) => ({
              ...provided,
              width: "325px",
            }),
          }}
        />

        <Goal
          goals={selectedGoals}
          removeGoal={removeGoal}
          updateGoal={(id: number, newGoal: GoalItem) =>
            updateGoal(id, newGoal)
          }
        />
      </div>
    </>
  );
};

export default Goals;
