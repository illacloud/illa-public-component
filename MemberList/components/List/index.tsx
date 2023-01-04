import { Table } from "@illa-design/react"
import { FC, useMemo } from "react"
import { NameSpace } from "@/illa-public-component/MemberList/components/List/NameSpace"
import {
  listBodyStyle,
  listWrapperStyle,
} from "@/illa-public-component/MemberList/components/List/style"

export const List: FC = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Ameliorated explicit open system",
      },
      {
        id: 2,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Customizable explicit solution",
      },
      {
        id: 3,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Proactive mission-critical open architecture",
      },
      {
        id: 4,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "De-engineered bi-directional hardware",
      },
      {
        id: 5,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Customer-focused client-server budgetary management",
      },
      {
        id: 6,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Distributed interactive monitoring",
      },
      {
        id: 7,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Synchronised context-sensitive implementation",
      },
      {
        id: 8,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "User-friendly responsive hardware",
      },
      {
        id: 9,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Compatible upward-trending system engine",
      },
      {
        id: 10,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 11,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "User-friendly responsive hardware",
      },
      {
        id: 12,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Compatible upward-trending system engine",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
      {
        id: 13,
        name: {
          img: "xxxx",
          name: "xxxx",
          email: "xxxx",
        },
        company: "Cloned scalable website",
      },
    ],
    [],
  )

  const columns = useMemo(
    () => [
      {
        id: "name",
        header: "name",
        accessorKey: "name", // accessor is the "key" in the data
        cell: (props: Record<string, any>) => {
          console.log("props", props)
          console.log("value", props.getValue())
          const value = props.getValue()
          return (
            <NameSpace
              name={value?.name}
              avatar={value?.img}
              email={value?.email}
            />
          )
        },
      },
      {
        id: "permissions",
        header: "permissions",
        accessorKey: "id", // accessor is the "key" in the data
        cell: (props: Record<string, any>) => {
          console.log("props", props)
          return 1111
        },
      },
      {
        id: "action",
        header: " ",
        accessorKey: "company",
        enableSorting: false,
      },
    ],
    [],
  )
  return (
    <div css={listWrapperStyle}>
      <Table
        data={data}
        columns={columns}
        css={listBodyStyle}
        pinedHeader
        tableLayout="fixed"
        h="100%"
      />
    </div>
  )
}
