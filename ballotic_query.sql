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


-- add status column in elections table
ALTER TABLE elections
ADD COLUMN current_status bool default 1 not null;

-- update election status
UPDATE elections
SET current_status = false
WHERE election_id=3;



SELECT v.*, d.district_name
FROM voter v
JOIN districts d ON v.district_id = d.district_id;


SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;


-- selectnig and creating additional fields while fetching candidates list
SELECT c.*, p.party_name, e.election_name
FROM candidates AS c
JOIN parties AS p ON p.party_id = c.party_id
JOIN elections AS e ON e.election_id = c.election_id;


-- add email column to the candidates table
ALTER TABLE candidates
ADD COLUMN email VARCHAR(50) NOT NULL;


-- adding column entries in candidates table
UPDATE candidates
SET email = CASE 
    WHEN candidate_id = 1 THEN 'amitshah@gmail.com'
    WHEN candidate_id = 2 THEN 'soniyagandhi@gmail.com'
    WHEN candidate_id = 3 THEN 'smritiirani@gmail.com'
    WHEN candidate_id = 4 THEN 'manpreetsingh@gmail.com'
    WHEN candidate_id = 5 THEN 'zakirnagar@gmail.com'
    WHEN candidate_id = 6 THEN 'rajendrasahu@gmail.com'
    ELSE email
END
 WHERE candidate_id IN (1, 2, 3, 4, 5, 6);
 
 
 
-- TO fetch the election data with some additional columns 
SELECT e.*, 
IFNULL(w.ward_name, 'null')  AS ward_name, 
IFNULL(d.district_name, 'null') AS district_name
FROM elections AS e
LEFT JOIN wards AS w ON w.ward_number = e.ward_number 
LEFT JOIN districts AS d ON d.district_id = e.district_id;

-- voter updation by admin
UPDATE voter
SET username="katy_smith", email ="kate@gmail.com"
WHERE voter_id=8;