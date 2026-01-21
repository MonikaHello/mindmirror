import { createClient } from '@/lib/supabase/server'

export default async function HistoryPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user?.id as string)
    .order('created_at', { ascending: false })

  return (
    <div className="py-8">
      <h1 className="text-2xl font-light mb-4">History</h1>
      {entries?.length === 0 ? (
        <div className="card">
          <p className="text-white/60">No entries yet. Start 
journaling!</p>
        </div>
      ) : (
        entries?.map((entry: any) => (
          <div key={entry.id} className="card mb-3">
            <div className="text-sm text-white/40 mb-2">
              {new Date(entry.created_at).toLocaleDateString()}
            </div>
            <div className="text-white/80">{entry.event || 
entry.thought}</div>
            <div className="flex gap-2 mt-2">
              {entry.feelings?.map((f: string) => (
                <span key={f} className="text-xs bg-white/10 px-2 py-1 
rounded">{f}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
