import { StatementRow } from "@/components/financial/statement-row";
import { SparkLine } from "@/components/financial/spark-line";
import { IllustrativeNote } from "@/components/financial/illustrative-note";
import { DocumentIcon } from "@/components/icons";

/* Every figure below is invented. Each visual that shows numbers carries a
   visible illustrative label, and the two that show no numbers say plainly
   that they are examples of structure rather than of a real engagement. */

function VisualLabel({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="text-eyebrow uppercase text-ink-tertiary">
      {children}
    </figcaption>
  );
}

/* Money out is shown in parentheses, the ordinary ledger convention — a leading
   minus sign floats away from its digits in a tabular-figure column. */
const ledgerRows = [
  { date: "03/04", description: "Client deposit", amount: "4,200.00" },
  { date: "03/07", description: "Software subscription", amount: "(84.00)" },
  { date: "03/11", description: "Supplier invoice", amount: "(1,340.00)" },
  { date: "03/15", description: "Client deposit", amount: "2,750.00" },
  { date: "03/22", description: "Utilities", amount: "(218.50)" },
];

/** 01 — a reconciled month, shown as the ledger it actually is. */
export function LedgerExtract() {
  return (
    <figure>
      <VisualLabel>Illustrative ledger extract</VisualLabel>

      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">
          An example of categorized transactions for one month.
        </caption>
        <thead>
          <tr className="text-eyebrow uppercase text-ink-tertiary">
            <th scope="col" className="border-b border-border-strong pb-2 font-sans font-semibold">
              Date
            </th>
            <th scope="col" className="border-b border-border-strong pb-2 font-sans font-semibold">
              Description
            </th>
            <th
              scope="col"
              className="border-b border-border-strong pb-2 text-right font-sans font-semibold"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {ledgerRows.map((row) => (
            <tr key={row.date + row.description} className="border-b border-border">
              <td className="numeric py-3 pr-3 align-baseline text-caption text-ink-tertiary">
                {row.date}
              </td>
              <td className="py-3 pr-3 align-baseline text-body-sm text-ink-secondary">
                {row.description}
              </td>
              <td className="numeric py-3 text-right align-baseline text-body-sm text-ink">
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IllustrativeNote className="mt-5" />
    </figure>
  );
}

const yearEndFile = [
  "Income summary",
  "Expense categories",
  "Bank reconciliations",
  "Asset and equipment records",
  "Supporting documentation",
];

/** 02 — the year, assembled into one file rather than scattered. */
export function YearEndFile() {
  return (
    <figure>
      <VisualLabel>Illustrative year-end file</VisualLabel>

      <ul className="mt-6 border-t border-border-strong">
        {yearEndFile.map((item) => (
          <li
            key={item}
            className="flex items-center gap-4 border-b border-border py-4"
          >
            <DocumentIcon size={18} className="shrink-0 text-accent" />
            <span className="text-body-sm text-ink-secondary">{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-caption text-ink-tertiary">
        An example of how information is organized, not a filing checklist.
      </p>
    </figure>
  );
}

const payrollRows = [
  { label: "Gross wages", value: "$18,400" },
  { label: "Employer contributions", value: "$2,150" },
  { label: "Payroll taxes", value: "$1,980" },
];

/** 03 — payroll expressed the way it lands in the books. */
export function PayrollSummary() {
  return (
    <figure>
      <VisualLabel>Illustrative payroll summary</VisualLabel>

      <div className="mt-6 flex flex-col gap-4">
        {payrollRows.map((row) => (
          <StatementRow key={row.label} label={row.label} value={row.value} />
        ))}
        <div className="mt-2 border-t border-border-strong pt-4">
          <StatementRow label="Total payroll cost" value="$22,530" emphasis />
        </div>
      </div>

      <IllustrativeNote className="mt-5" />
    </figure>
  );
}

/* Money out in parentheses again, and the arithmetic actually resolves:
   96,400 − 61,250 = 35,150. A statement whose total does not add up would
   undercut the one thing an accounting site has to demonstrate. */
const position = [
  { label: "Revenue", amount: "$96,400" },
  { label: "Less — operating expenses", amount: "($61,250)" },
];

/** 04 — a month resolved down to one figure, and what that figure is for.
    This is the section whose copy promises "a financial picture an owner can
    actually read and use when making decisions", so the visual carries the
    movement all the way to the decision rather than stopping at the total. */
export function AccountPosition() {
  return (
    <figure>
      <VisualLabel>Illustrative position — March</VisualLabel>

      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">
          An example of how one month&rsquo;s revenue and operating expenses
          resolve into a cash position.
        </caption>
        <tbody>
          {position.map((row) => (
            <tr key={row.label} className="border-b border-border">
              <th
                scope="row"
                className="py-3 pr-4 text-left align-baseline text-body-sm font-normal text-ink-secondary"
              >
                {row.label}
              </th>
              <td className="numeric py-3 text-right align-baseline text-body-sm text-ink">
                {row.amount}
              </td>
            </tr>
          ))}
          <tr>
            <th
              scope="row"
              className="border-t border-border-strong py-4 pr-4 text-left align-baseline text-body-sm font-medium text-ink"
            >
              Cash position
            </th>
            <td className="numeric border-t border-border-strong py-4 text-right align-baseline font-serif text-h3 text-ink">
              $35,150
            </td>
          </tr>
        </tbody>
      </table>

      {/* The last step of the movement is a decision, not a figure — so it is
          set as text and connected by a rule rather than given a fake number. */}
      <div className="mt-7 flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-1.5 block h-10 w-px shrink-0 bg-border-strong"
        />
        <div>
          <p className="text-eyebrow uppercase text-ink-tertiary">
            What that figure informs
          </p>
          <p className="mt-2 text-body-sm text-ink-secondary">
            Whether to hire, when to invest, and what can wait.
          </p>
        </div>
      </div>

      <IllustrativeNote className="mt-6" />
    </figure>
  );
}

const quarter = [
  { month: "July", revenue: "$26,900", expenses: "$14,200", net: "$12,700" },
  { month: "August", revenue: "$29,450", expenses: "$15,780", net: "$13,670" },
  { month: "September", revenue: "$31,120", expenses: "$15,040", net: "$16,080" },
];
const quarterTrend = [12.7, 13.1, 13.67, 14.4, 15.2, 16.08];

/** 05 — a period read side by side, which is what a report is for. */
export function QuarterlyReport() {
  return (
    <figure>
      <VisualLabel>Illustrative report — Q3</VisualLabel>

      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">
          An example quarterly summary of revenue, expenses and net figures.
        </caption>
        <thead>
          <tr className="text-eyebrow uppercase text-ink-tertiary">
            <th scope="col" className="border-b border-border-strong pb-2 font-sans font-semibold">
              Month
            </th>
            <th scope="col" className="border-b border-border-strong pb-2 text-right font-sans font-semibold">
              Revenue
            </th>
            <th scope="col" className="border-b border-border-strong pb-2 text-right font-sans font-semibold">
              Expenses
            </th>
            <th scope="col" className="border-b border-border-strong pb-2 text-right font-sans font-semibold">
              Net
            </th>
          </tr>
        </thead>
        <tbody>
          {quarter.map((row) => (
            <tr key={row.month} className="border-b border-border">
              <th
                scope="row"
                className="py-3 pr-3 text-left align-baseline text-body-sm font-normal text-ink-secondary"
              >
                {row.month}
              </th>
              <td className="numeric py-3 pl-2 text-right align-baseline text-body-sm text-ink-secondary">
                {row.revenue}
              </td>
              <td className="numeric py-3 pl-2 text-right align-baseline text-body-sm text-ink-secondary">
                {row.expenses}
              </td>
              <td className="numeric py-3 pl-2 text-right align-baseline text-body-sm text-ink">
                {row.net}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 border-t border-border-strong pt-6">
        {/* Wide and low: the SVG scales to its container, so a 240-wide box
            would render ~160px tall here and read as a dashboard chart. */}
        <SparkLine data={quarterTrend} width={520} height={68} />
        <p className="mt-3 text-caption text-ink-tertiary">
          Net movement across the quarter
        </p>
      </div>

      <IllustrativeNote className="mt-5" />
    </figure>
  );
}

/* Abstract bars stand in for document rows: ragged on the left, even on the
   right. The difference is the whole point, so both states are also named in
   text for anyone who cannot see the bars. */
const asFound = [92, 46, 78, 30, 64, 22];
const brought = [88, 88, 88, 88, 88, 88];

/** 06 — the same records, before and after. */
export function RecordsState() {
  return (
    <figure>
      <VisualLabel>Illustrative records state</VisualLabel>

      <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div>
          <h3 className="text-h4 text-ink">Records as found</h3>
          <ul aria-hidden="true" className="mt-5 flex flex-col gap-3">
            {asFound.map((width, i) => (
              <li
                key={i}
                className="h-0.75 bg-border-strong"
                style={{ width: `${width}%` }}
              />
            ))}
          </ul>
          <p className="mt-6 text-body-sm text-ink-secondary">
            Uneven, incomplete, hard to reconcile.
          </p>
        </div>

        <div>
          <h3 className="text-h4 text-ink">Records brought current</h3>
          <ul aria-hidden="true" className="mt-5 flex flex-col gap-3">
            {brought.map((width, i) => (
              <li
                key={i}
                className="h-0.75 bg-accent/35"
                style={{ width: `${width}%` }}
              />
            ))}
          </ul>
          <p className="mt-6 text-body-sm text-ink-secondary">
            Consistent, categorized, ready to work from.
          </p>
        </div>
      </div>

      <p className="mt-8 text-caption text-ink-tertiary">
        A diagram of what catch-up work changes, not a record of client results.
      </p>
    </figure>
  );
}
