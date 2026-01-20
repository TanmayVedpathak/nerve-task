import { useMemo, useState } from "react";
import { dateArray, strategyArray } from "./data/data";
import "./App.css";

const views = ["Bullish", "Bearish", "RangeBound", "Volatile"];

export default function StrategyDashboard() {
  const [selectedView, setSelectedView] = useState("Bullish");
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);

  const strategiesForDate = useMemo(() => {
    const viewData = strategyArray.find((item) => item.View === selectedView);
    return viewData?.Value[selectedDate] || [];
  }, [selectedView, selectedDate]);

  const strategyCount = useMemo(() => {
    return strategiesForDate.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  }, [strategiesForDate]);

  return (
    <div className="wrapper">
      <div className="segmented">
        {views.map((view) => (
          <button
            key={view}
            className={view === selectedView ? "active" : ""}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="dropdown">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateArray.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="card-list">
        {Object.keys(strategyCount).length === 0 ? (
          <div className="empty-state">
            No strategies available for {selectedDate}
          </div>
        ) : (
          Object.entries(strategyCount).map(([name, count]) => (
            <div className="card" key={name}>
              <span className="card-title">{name}</span>
              <span className="card-count">
                • {count} {count === 1 ? "Strategy" : "Strategies"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
