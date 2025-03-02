import BaseDetails from "./BaseDetails";

export default function MagazineDetails() {
    return (
        <BaseDetails
            title="Magazine Details"
            apiUrl="/api/RewardMagazine/GetMagazine"
            entityFields={[
                { label: "Id", key: "id" },
                { label: "RoomId", key: "roomId" },
                { label: "Description", key: "description" },
                { label: "MagazineOwnerId", key: "magazineOwnerId" },
                { label: "TotalCost", key: "totalCost" }
            ]}
            subEntityConfig={{
                title: "Magazine Lines",
                apiUrl: "/api/RewardMagazineLine/GetMagazineLinesByMagazineId",
                columns: [
                    { label: "Id", key: "id" },
                    { label: "RewardId", key: "rewardId" },
                    { label: "EventDescription", key: "eventDescription" },
                    { label: "ModifiedDate", key: "modifiedDate" },
                    { label: "Cost", key: "cost" },
                    { label: "ModifiedDate", key: "modifiedDate" }
                ]
            }}
        />
    )}

