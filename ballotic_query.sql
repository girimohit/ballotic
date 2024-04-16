USE ballotic;


SELECT * FROM (
SELECT election_id AS ElectionID, candidate_id AS CandidateID, COUNT(*) AS vote_count
FROM votes
GROUP BY election_id, candidate_id
ORDER BY ElectionID) AS resTable
WHERE ElectionID = 2;


SELECT c.candidate_id, c.name AS candidate_name, p.party_name 
FROM Candidates AS c  
JOIN Parties AS p ON c.party_id = p.party_id  
JOIN Candidates AS ec ON c.candidate_id = ec.candidate_id  
WHERE ec.election_id = 2;



ALTER TABLE voter
ADD COLUMN district_id INT NOT NULL DEFAULT 3,
ADD CONSTRAINT fk_district
FOREIGN KEY (district_id)
REFERENCES Districts(district_id);


-- Elections according to voter's district
SELECT * 
FROM elections 
WHERE (district_id) IN 
(SELECT district_id FROM voter WHERE username='mohit') 
OR district_id IS NULL;


-- update elections entries
UPDATE elections
SET district_id = 3
WHERE election_id = 1;