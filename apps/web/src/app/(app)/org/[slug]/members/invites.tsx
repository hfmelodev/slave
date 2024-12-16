import { ability, getCurrentOrg } from '@/auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/http/invites/getInvites'

import { RevokeInviteButton } from './components/revoke-invite'

export async function Invites() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const { invites } = await getInvites(currentOrg!)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle>Convidar membros</CardTitle>
          </CardHeader>

          <CardContent></CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Convites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => {
                return (
                  <TableRow key={invite.id}>
                    <TableCell className="py-2.5">
                      <span className="text-muted-foreground">
                        {invite.email}
                      </span>
                    </TableCell>

                    <TableCell className="py-2.5 font-medium">
                      <span className="rounded-sm border px-4 py-2">
                        {invite.role}
                      </span>
                    </TableCell>

                    <TableCell className="py-2.5">
                      {permissions?.can('delete', 'Invite') && (
                        <div className="flex justify-end">
                          <RevokeInviteButton inviteId={invite.id} />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="text-center text-muted-foreground">
                    Nenhum convite encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
