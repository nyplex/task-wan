import React, { useRef, useState, useEffect, useMemo } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { format, startOfMonth, endOfMonth, isSameDay, addDays } from "date-fns";

const ITEM_WIDTH = 70; // Changed to match actual rendered width

const generateMonthDays = (baseDate: Date) => {
  const start = startOfMonth(baseDate);
  const end = endOfMonth(baseDate);
  const days = [];
  let current = start;
  while (current <= end) {
    days.push(current);
    current = addDays(current, 1);
  }
  return days;
};

type Props = {
  initialDate: number;
  disabled?: boolean;
  onPress?: (date: number) => void;
};

const CalendarTimeline = ({ initialDate, disabled = false, onPress }: Props) => {
  const baseDate = new Date(initialDate);
  const days = useMemo(() => generateMonthDays(baseDate), [initialDate]);
  const [selectedDate, setSelectedDate] = useState(baseDate);
  const listRef = useRef<FlatList>(null);

  // When initialDate changes, update selectedDate & scroll
  useEffect(() => {
    setSelectedDate(baseDate);

    const index = days.findIndex((day) => isSameDay(day, baseDate));
    if (index !== -1) {
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index,
          animated: true,
          viewOffset: 0,
          viewPosition: 0.5, // Center the item
        });
      }, 100);
    }
  }, [initialDate, days]);

  const handlePress = (date: Date, index: number) => {
    if (disabled) return;
    setSelectedDate(date);
    listRef.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 0,
      viewPosition: 0.5, // Center the item
    });
    onPress?.(date.getTime());
  };

  const renderItem = ({ item, index }: { item: Date; index: number }) => {
    const isSelected = isSameDay(item, selectedDate);
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => handlePress(item, index)}
        className="h-[64px]">
        <View className="h-[64px] w-[70px] justify-center items-center">
          <View
            style={{
              width: isSelected ? 64 : 50, // Updated to use consistent sizing
              height: isSelected ? 64 : 50,
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 12,
              backgroundColor: isSelected ? "#2563EB" : "#EBF2FF",
              opacity: disabled ? 0.4 : 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: isSelected ? 0.25 : 0,
            }}>
            <Text style={{ color: isSelected ? "white" : "#777", fontWeight: "600" }}>
              {format(item, "EEE")}
            </Text>
            <Text style={{ color: isSelected ? "white" : "#111", fontSize: 16 }}>
              {format(item, "d")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={listRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={days}
      keyExtractor={(item) => item.toISOString()}
      renderItem={renderItem}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH, // Now matches actual width (70px)
        offset: ITEM_WIDTH * index,
        index,
      })}
    />
  );
};

export default CalendarTimeline;
