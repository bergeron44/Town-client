import React from 'react';

function VotingTable({ votes }) {
  return (
    <div className="voting-table">
      <h3>Voting Results</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {votes.map((vote, index) => (
            <tr key={index}>
              <td>{vote.playerName}</td>
              <td>{vote.choice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VotingTable;
