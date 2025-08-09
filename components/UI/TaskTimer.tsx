import React, { useEffect, useState } from "react";
import { Box } from "../gluestack/box";
import { HStack } from "../gluestack/hstack";
import Text from "../Text";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type Props = {
  timestamp: number;
};

const TaskTimer = ({ timestamp }: Props) => {
  const [monthsLeft, setMonthsLeft] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);

  const calculateTimeLeft = React.useCallback(() => {
    const now = dayjs();
    const target = dayjs(timestamp);

    let months = target.diff(now, "month");
    let rest = target.subtract(months, "month");

    let days = rest.diff(now, "day");
    rest = rest.subtract(days, "day");

    let hours = rest.diff(now, "hour");
    rest = rest.subtract(hours, "hour");

    let minutes = rest.diff(now, "minute");

    // Avoid negatives if time has passed
    if (target.isBefore(now)) {
      months = 0;
      days = 0;
      hours = 0;
      minutes = 0;
    }

    setMonthsLeft(months);
    setDaysLeft(days);
    setHoursLeft(hours);
    setMinutesLeft(minutes);
  }, [timestamp]);

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // update every minute
    return () => clearInterval(interval);
  }, [timestamp, calculateTimeLeft]);

  return (
    <HStack className="justify-between items-center h-[96px]">
      {monthsLeft > 0 && (
        <Box className="aspect-square h-[96px]">
          <TimeBox label="Months" value={monthsLeft} />
        </Box>
      )}
      {monthsLeft > 0 && <Box className="h-[2px] flex-1 bg-primary-400" />}
      <Box className="aspect-square h-[96px]">
        <TimeBox label="Days" value={daysLeft} />
      </Box>
      <Box className="h-[2px] flex-1 bg-primary-400" />
      <Box className="aspect-square h-[96px]">
        <TimeBox label="Hours" value={hoursLeft} />
      </Box>
      {monthsLeft <= 0 && (
        <>
          <Box className="h-[2px] flex-1 bg-primary-400" />
          <Box className="aspect-square h-[96px]">
            <TimeBox label="Minutes" value={minutesLeft} />
          </Box>
        </>
      )}
    </HStack>
  );
};

const TimeBox = ({ label, value }: { label: string; value: number }) => (
  <Box
    style={{ alignItems: "center" }}
    className="h-full items-center justify-center rounded-3xl bg-primary-50"
  >
    <Text className="text-white" size="heading" weight="bold">
      {value}
    </Text>
    <Text className="text-white" size="caption" weight="medium">
      {label}
    </Text>
  </Box>
);

export default TaskTimer;
