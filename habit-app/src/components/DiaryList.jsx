import BaseList from "./BaseList";

export default function DiaryList2() {
  return (
    <BaseList
      title="Diaries"
      apiUrl="/api/HabitDiary/AllDiaries"
      entityName="Diary"
      editPath="/admin/diary/edit"
      columns={[
        { key: "id", label: "Id" },
        { key: "roomId", label: "RoomId" },
        { key: "description", label: "Description" },
        { key: "diaryOwnerId", label: "DiaryOwnerId" },
        { key: "totalCost", label: "TotalCost" },
      ]}
    />
  );
}
