import BaseDetails from "./BaseDetails";

export default function DiaryDetails() {
    return (
        <BaseDetails
            title="Diary Details"
            apiUrl="/api/HabitDiary/GetDiary"
            entityFields={[
                { label: "Id", key: "id" },
                { label: "RoomId", key: "roomId" },
                { label: "Description", key: "description" },
                { label: "DiaryOwnerId", key: "diaryOwnerId" },
                { label: "TotalCost", key: "totalCost" }
            ]}
            subEntityConfig={{
                title: "Diary Lines",
                apiUrl: "/api/HabitDiaryLine/GetDiaryLinesByDiaryId",
                columns: [
                    { label: "Id", key: "id" },
                    { label: "EntityId", key: "entityId" },
                    { label: "EntityType", key: "entityType" },
                    { label: "EventDescription", key: "eventDescription" },
                    { label: "ModifiedDate", key: "modifiedDate" },
                    { label: "Status", key: "status" },
                    { label: "Cost", key: "cost" },
                ]
            }}
        />
    )}