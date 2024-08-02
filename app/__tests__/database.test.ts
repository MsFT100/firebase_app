import { addMember, getMembers } from '../utils/database'; // adjust path as needed

// Define the type for the result of addMember
interface AddMemberResult {
  insertId?: number; // or whatever fields you expect
}

// Define the type for the members retrieved
interface Member {
  id: number; // or whatever fields you expect
  name: string;
}

test('adds and retrieves a member', async () => {
  // Function to handle callback
  const handleMembers = (members: Member[]) => {
    expect(members.length).toBeGreaterThan(0);
    expect(members[0].name).toBe('John Doe');
  };

  // Add member
  await addMember('John Doe', (result: AddMemberResult) => {
    expect(result.insertId).toBeDefined();
  });

  // Retrieve members
  await getMembers(handleMembers);
});
