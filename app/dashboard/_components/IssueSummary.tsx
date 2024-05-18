import { Status } from '@prisma/client';
import { Flex, Card, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({open, inProgress, closed}:Props) => {
  const containers:{label:string, value:number, status:Status}[] = [
    {label: 'Open Issues', value: open, status:'OPEN'},
    {label: 'In Progress Issues', value: inProgress, status:"IN_PROGRESS"},
    {label: 'Closed Issues', value: closed, status:'CLOSED'}
  ]
    return (
    <Flex gap='4'>
        {containers.map((container)=>(
            <Card key={container.label}>
                <Flex direction='column' gap='4'>
            <Link href={`/issues/view?status=${container.status}`}>{container.label}</Link>
            <Text>{container.value}</Text>
                </Flex>

            </Card>

        ))}
    </Flex>
  )
}

export default IssueSummary