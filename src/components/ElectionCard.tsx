import { useState, useEffect } from "react";
import Image from "next/image"
import AvatarComponent from "./avatar"
import VotePopup from "./votePopup"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ShieldAlert, MapPin, Calendar } from "lucide-react";

export default function ElectionCard() {
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchElectionData = async () => {
    try {
      const electionResponse = await fetch('/api/elections')
      const data = await electionResponse.json();
      setElections(data.elections || [])
    } catch (error) {
      console.log("Error fetching election data")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchElectionData();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl flex flex-col gap-6 items-center py-12">
        {[1, 2].map((i) => (
          <div key={i} className="w-full glass-panel rounded-3xl p-8 animate-pulse h-60 flex flex-col justify-between">
            <div className="h-6 bg-border rounded w-1/3 mx-auto"></div>
            <div className="flex justify-around items-center my-4">
              <div className="h-14 w-14 bg-border rounded-full"></div>
              <div className="h-8 bg-border rounded w-12"></div>
              <div className="h-14 w-14 bg-border rounded-full"></div>
            </div>
            <div className="h-8 bg-border rounded w-24 ml-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (elections.length === 0) {
    return (
      <div className="glass-panel max-w-md rounded-2xl p-8 text-center flex flex-col items-center gap-4 my-12">
        <ShieldAlert size={48} className="text-secondary-foreground" />
        <h3 className="font-bold text-xl">No Elections Found</h3>
        <p className="text-muted-foreground text-sm">
          There are no active or configured elections assigned to your district or ward at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl px-4 flex flex-col gap-8 items-center pb-24">
      {elections.map((i) => (
        <div 
          key={i.election_id} 
          className="w-full glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden glass-card-hover border-border/40"
        >
          {/* Status Badge */}
          <div className="absolute top-0 left-0">
            {i.current_status ? (
              <span className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-primary/20 text-primary border-r border-b border-primary/20 rounded-br-2xl">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                Live Election
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-muted text-muted-foreground border-r border-b border-border/50 rounded-br-2xl">
                Election Concluded
              </span>
            )}
          </div>

          {/* Heading */}
          <div className="text-center mt-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{i.election_name}</h2>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-2">
              {i.district_id && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  District: {i.district_id}
                </span>
              )}
              {i.ward_number && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Ward: {i.ward_number}
                </span>
              )}
            </div>
          </div>

          {/* Candidate Matchup VS */}
          <div className="flex justify-around items-center my-6 md:my-8 px-4">
            {i.candidates && i.candidates.length > 0 ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <AvatarComponent name={i.candidates[0]?.candidate_name || "Candidate A"} />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                    {i.candidates[0]?.party_name || "Independent"}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-primary/45 font-mono italic">VS</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <AvatarComponent name={i.candidates[1]?.candidate_name || "Candidate B"} />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                    {i.candidates[1]?.party_name || "Independent"}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">No candidates assigned to this election yet.</p>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end border-t border-border/20 pt-4 mt-2 gap-4">
            {session ? (
              <VotePopup 
                candidates={i.candidates || []} 
                electionID={i.election_id} 
                isElectionLive={!!i.current_status} 
              />
            ) : (
              <Link 
                href="/auth/login" 
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold p-2.5 px-6 rounded-xl transition duration-200 shadow-md shadow-primary/10"
              >
                Log in to Vote
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}