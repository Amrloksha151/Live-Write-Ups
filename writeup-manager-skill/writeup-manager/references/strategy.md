# Pedagogical Strategy: Security Training

This guide defines how to design interactive elements that foster critical thinking and decision-making skills in security professionals.

## The Goal
The objective is not to test if a user knows a specific tool command, but to test if they understand **why** a specific path was chosen and **how** to evaluate the results.

## Framing Decision Points

### 1. The "Why" over the "What"
- **Bad**: "What tool should I use to scan for ports?" (Choice: nmap, masscan, rustscan)
- **Good**: "Given the stealth requirement for this operation, how should we approach initial discovery?"
  - **Correct**: "Slow-paced nmap scan with randomized timing"
  - **Reason**: Higher-speed scans trigger automated WAF/IDS alerts which would compromise the 'stealth' goal.

### 2. Result Interpretation
Instead of asking what to do next, ask what a specific result means.
- **Scenario**: A scan returns `Port 80: Open (Server: Apache/2.4.41)`.
- **Question**: "The server header indicates a common version. What is the most reliable next step to find an entry point?"
  - **Correct**: "Search for known vulnerabilities in this specific version while fuzzing for hidden directories."
  - **Reason**: Version identification is just one layer; hidden endpoints often harbor the real vulnerabilities.

### 3. Error Handling & Pivoting
Include decision points when a tool fails or returns unexpected results.
- **Question**: "Your exploit failed with a '403 Forbidden' error. What does this suggest about the target?"
  - **Correct**: "The payload was likely caught by a WAF rule, or the session token has expired."
  - **Reason**: Understanding failure is critical for persistence and payload refinement.

## Tone & Feedback
- **Feedback is for learning**: When a user picks the "Incorrect" option, the explanation should be encouraging and explain the nuance they missed.
- **Professional & Precise**: Use technical terminology correctly (e.g., "Normalisation mismatch", "Race condition", "Egress filtering").

## Logic Stages
A high-quality walkthrough should follow these logical phases:
1. **Reconnaissance**: Information gathering and footprinting.
2. **Discovery**: Identifying specific vulnerabilities or misconfigurations.
3. **Exploitation**: The actual "hack" or bypass.
4. **Post-Exploitation**: Lateral movement, data exfiltration, or persistence.
5. **Mitigation**: How to fix the issue (Crucial for defensive learning).
