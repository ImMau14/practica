import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

type DataItem = {
  name: string
  value: number
}

interface BarChartAnimatedProps {
  data: DataItem[]
}

function BarChartAnimated({ data }: BarChartAnimatedProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Bar dataKey="value" fill="#94b434" isAnimationActive={false} animationDuration={0} />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartAnimated