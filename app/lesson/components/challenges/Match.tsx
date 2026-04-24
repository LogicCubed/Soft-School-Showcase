"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  id: number;
  text: string;
  matchKey?: string;
};

type Props = {
  challenge: any;
  value: number[];
  onChange: (value: number[]) => void;
  status?: "correct" | "wrong" | "none";
};

function SortableItem({
  item,
  itemStatus,
  globalStatus,
}: {
  item: Item;
  itemStatus: "correct" | "wrong" | "none";
  globalStatus?: "correct" | "wrong" | "none";
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: String(item.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
  };

  const isLocked = globalStatus === "correct" || globalStatus === "wrong";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center rounded-xl border-2 border-b-4 transition select-none",
        "text-neutral-700 font-bold",
        isLocked && itemStatus === "correct" && "border-green-300 bg-green-100",
        isLocked && itemStatus === "wrong" && "border-rose-300 bg-rose-100",
        !isLocked && "border-slate-300 hover:bg-black/5 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 cursor-grabbing"
      )}
    >
      <div className="px-2 py-3 flex items-center self-stretch text-slate-400 border-r-2 border-slate-200">
        <GripVertical className="w-4 h-4 shrink-0" />
      </div>

      <div className="px-4 py-3 flex-1 text-left">
        {item.text}
      </div>
    </div>
  );
}

export const Match = ({
  challenge,
  value,
  onChange,
  status,
}: Props) => {
  const right: Item[] = challenge.match?.right ?? [];
  const left: Item[] = challenge.match?.left ?? [];

  const [orderedRight, setOrderedRight] = useState<Item[]>(() => right);

  const valueKey = value.join(",");

  useEffect(() => {
    if (value?.length) {
      const mapped = value
        .map((id) => right.find((r) => r.id === id))
        .filter(Boolean) as Item[];
      setOrderedRight(mapped);
    } else {
      setOrderedRight(right);
    }
  }, [challenge.id, valueKey]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 0 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 0, tolerance: 0 },
    }),
  );

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedRight.findIndex((i) => String(i.id) === active.id);
    const newIndex = orderedRight.findIndex((i) => String(i.id) === over.id);

    const newOrder = arrayMove(orderedRight, oldIndex, newIndex);
    setOrderedRight(newOrder);
    onChange(newOrder.map((i) => i.id));
  };

  const isLocked = status === "correct" || status === "wrong";

  const getItemStatus = (index: number): "correct" | "wrong" | "none" => {
    if (!isLocked) return "none";
    const leftItem = left[index];
    const rightItem = orderedRight[index];

    console.log(`Status: [getItemStatus] index=${index}`, {
      leftMatchKey: leftItem?.matchKey,
      rightMatchKey: rightItem?.matchKey,
      leftItem,
      rightItem,
    });

    if (!leftItem || !rightItem) return "none";
    return String(rightItem.matchKey) === String(leftItem.matchKey) ? "correct" : "wrong";
  };

  return (
    <div className="flex flex-col gap-y-6 text-center">
      {challenge.promptText && (
        <h1 className="text-lg lg:text-3xl font-bold text-neutral-700">
          {challenge.promptText}
        </h1>
      )}

      {challenge.imageSrc && (
        <div className="w-full max-w-md mx-auto">
          <img
            src={challenge.imageSrc}
            className="w-full rounded-lg"
            alt="challenge"
          />
        </div>
      )}

      {challenge.callToAction && (
        <p className="text-neutral-500 text-sm lg:text-base">
          {challenge.callToAction}
        </p>
      )}

      <div className="flex gap-2 items-start">
        {/* LEFT SIDE — static */}
        <div className="flex-1 space-y-3">
          {left.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "px-4 py-3 rounded-xl border-2 border-b-4 text-left font-bold text-neutral-700 select-none",
                isLocked && getItemStatus(i) === "correct" && "border-green-300 bg-green-100",
                isLocked && getItemStatus(i) === "wrong" && "border-rose-300 bg-rose-100",
                !isLocked && "border-slate-300 bg-white"
              )}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <div className="flex flex-col self-stretch py-1 shrink-0">
          {left.map((item, i) => (
            <div key={item.id} className="flex-1 flex items-center justify-center">
              <MoveRight className={cn(
                "w-5 h-5",
                isLocked && getItemStatus(i) === "correct" && "text-green-400",
                isLocked && getItemStatus(i) === "wrong" && "text-rose-400",
                !isLocked && "text-slate-300"
              )} />
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — draggable */}
        <div className="flex-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={isLocked ? undefined : onDragEnd}
          >
            <SortableContext
              items={orderedRight.map((i) => String(i.id))}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {orderedRight.map((item, i) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    itemStatus={getItemStatus(i)}
                    globalStatus={status}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};