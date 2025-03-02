import React from 'react';
import BaseList from "./BaseList";

export default function MagazineList() {
  return (
    <BaseList
      title="Reward magazines"
      apiUrl="/api/RewardMagazine/AllMagazines"
      entityName="Magazine"
      editPath="/admin/magazine/edit"
      columns={[
        { key: "id", label: "Id" },
        { key: "roomId", label: "RoomId" },
        { key: "description", label: "Description" },
        { key: "magazineOwnerId", label: "MagazineOwnerId" },
        { key: "totalCost", label: "TotalCost" },
      ]}
    />
  );
}

