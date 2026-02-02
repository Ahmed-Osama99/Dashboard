import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useFilters } from "../context/FiltersContext";
// Calendar component from scratch
const Calendar = ({ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Filters context
  const { chosenDates, toggleChosenDates } = useFilters();
  // Helper: Display format for the UI "14 Oct 2024" 
  const formatDisplayDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day:'2-digit',
      month: "short",
      year: "numeric",
    });
  };
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

    const daysArray = [];
    // get padding days from prev month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      daysArray.push({
        day: daysInPrevMonth - i,
        type: "padding",
        id: `prev-${i}`,
      });
    }
    // get current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateId = formatDisplayDate(dateObj);
      daysArray.push({
        day,
        id: dateId,
        isToday: dateObj.toDateString() === today.toDateString(),
        isSelected: chosenDates.includes(dateId),
      });
    }
    // get padding days from next month
    const remainingCells = 42 - daysArray.length;
    for (let i = 1; i <= remainingCells; i++) {
      daysArray.push({ day: i, type: "padding", id: `next-${i}` });
    }
    console.log(chosenDates);
    return daysArray;
  }, [currentDate, chosenDates]);
  return (
    <div
      className={`bg-gray-700 text-sm w-[350px] p-4 rounded-xl divide-y divide-gray-500 ${className}`}
    >
      {/* Header */}
      <div className="flex pb-4 items-center">
        <h3 className="grow font-bold text-sm">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex gap-2">
          <button
            className="bg-gray-500 rounded-sm w-6 h-6 flex items-center justify-center hover:bg-gray-400 transition-colors"
            onClick={handlePrevMonth}
            aria-label="Previous Month"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="bg-gray-500 rounded-sm w-6 h-6 flex items-center justify-center hover:bg-gray-400 transition-colors"
            onClick={handleNextMonth}
            aria-label="Next Month"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold opacity-70">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid - Declarative Rendering */}
      <div className="grid grid-cols-7 gap-1 text-center pb-4">
        {calendarDays.map((cell) => {
          if (cell.type === "padding") {
            return (
              <div key={cell.id} className="py-1 opacity-30 select-none">
                {cell.day}
              </div>
            );
          }

          return (
            <button
              key={cell.id}
              onClick={() => toggleChosenDates(cell.id)}
              className={`
                        rounded-sm py-1 transition-colors 
                        ${cell.isToday ? "bg-[#FF8743] text-white" : ""}
                        ${
                          cell.isSelected
                            ? "!bg-(--hero-color) text-white font-bold"
                            : "hover:bg-(--hero-color)/50"
                        }
                    `}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-4">
        <p className="text-gray-400 text-xs text-center">
          *You can choose multiple dates
        </p>
        <button className="py-2 px-4 bg-(--hero-color) rounded-lg text-sm mt-4 w-full block cursor-pointer hover:opacity-90 transition-opacity font-semibold">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Calendar;
