'use client'

import {
  MrbAvatar,
  MrbButton,
  MrbCard,
  MrbCol,
  MrbDescription,
  MrbDescriptionList,
  MrbForm,
  MrbImage,
  MrbList,
  MrbNavbar,
  MrbRow,
  MrbTag,
  MrbTypography,
} from '@/designSystem'

export default function DemoShow() {
  const urlLogo = 'https://i.imgur.com/xP6Wver.png'
  return (
    <>
      <MrbNavbar>
        <MrbNavbar.Logo to="/showroom/components" urlLogo={urlLogo}>
          Ridley
        </MrbNavbar.Logo>

        <div className="mrb-fill-flex">
          <MrbNavbar.Link to="/showroom/components/demo">Home</MrbNavbar.Link>
          <MrbNavbar.Link to="/notification">Notifications</MrbNavbar.Link>
        </div>

        <MrbNavbar.Avatar to="/profile">
          <MrbAvatar>Ulric Musset</MrbAvatar>
        </MrbNavbar.Avatar>
      </MrbNavbar>
      <MrbCard size="full-width" className="mb-2 mt-2">
        <MrbCard.Header>
          <MrbRow vertical="center" gap={1}>
            <MrbCol>
              <MrbImage size="small" src="https://i.imgur.com/sbRCzP7.png" />
            </MrbCol>
            <MrbCol>
              <MrbTypography variant="h2" className="m-0">
                Unicorn, Inc.
              </MrbTypography>
              <MrbTypography variant="secondary">Series B</MrbTypography>
            </MrbCol>
          </MrbRow>
        </MrbCard.Header>
        <MrbCard.Body>
          <MrbDescriptionList orientation="horizontal" columns={3}>
            <MrbDescription>
              <MrbDescription.Label>Stage</MrbDescription.Label>
              <MrbDescription.Value>Series A</MrbDescription.Value>
            </MrbDescription>
            <MrbDescription>
              <MrbDescription.Label>Amount Raised</MrbDescription.Label>
              <MrbDescription.Value>$500,000</MrbDescription.Value>
            </MrbDescription>
            <MrbDescription>
              <MrbDescription.Label>Creation Date</MrbDescription.Label>
              <MrbDescription.Value>2 February 2023</MrbDescription.Value>
            </MrbDescription>
            <MrbDescription>
              <MrbDescription.Label>Share Price</MrbDescription.Label>
              <MrbDescription.Value>$499.99</MrbDescription.Value>
            </MrbDescription>
          </MrbDescriptionList>
        </MrbCard.Body>
        <MrbCard.Footer>
          <MrbRow horizontal="right">
            <MrbButton variant="primary" size="small">
              Invest
            </MrbButton>
          </MrbRow>
        </MrbCard.Footer>
      </MrbCard>
      <MrbRow className="mrb-fill-x" gap={2}>
        <MrbCol xs="6">
          <MrbCard>
            <MrbTypography variant="h3" className="m-0">
              Questions?
            </MrbTypography>
            <MrbList>
              <MrbList.Item>
                <MrbRow gap={2} vertical="center" className="mrb-fill-x">
                  <MrbAvatar>Alexandra L</MrbAvatar>{' '}
                  <MrbCol xs="fill">
                    <MrbTypography>Alexandra L</MrbTypography>
                    <MrbTypography variant="secondary">
                      What is the business plan of the company?{' '}
                    </MrbTypography>
                  </MrbCol>
                  <MrbTag variant="success">invested</MrbTag>
                </MrbRow>
              </MrbList.Item>

              <MrbList.Item>
                <MrbRow gap={2} vertical="center" className="mrb-fill-x">
                  <MrbAvatar>John L</MrbAvatar>{' '}
                  <MrbCol xs="fill">
                    <MrbTypography>John V</MrbTypography>
                    <MrbTypography variant="secondary">
                      Very compeling business plan!{' '}
                    </MrbTypography>
                  </MrbCol>
                  <MrbTag variant="success">invested</MrbTag>
                </MrbRow>
              </MrbList.Item>

              <MrbList.Item>
                <MrbRow gap={2} vertical="center" className="mrb-fill-x">
                  <MrbAvatar>Camilla V</MrbAvatar>
                  <MrbCol xs="fill">
                    <MrbRow horizontal="between">
                      <MrbTypography>Camilla V</MrbTypography>
                    </MrbRow>
                    <MrbTypography variant="secondary">
                      What was last year revenue?
                    </MrbTypography>
                  </MrbCol>
                  <MrbTag variant="default">interested</MrbTag>
                </MrbRow>
              </MrbList.Item>
            </MrbList>
          </MrbCard>
        </MrbCol>
        <MrbCol xs="6">
          <MrbCard>
            <MrbTypography variant="h3" className="m-0">
              Ask a question
            </MrbTypography>
            <MrbForm
              inputs={[
                {
                  key: 'name',
                  label: 'Your name',
                  indication: 'Just type your name here!',
                  type: 'text',
                },
                {
                  key: 'question',
                  label: 'Question',
                  type: 'textarea',
                },
              ]}
            >
              <MrbButton>Submit</MrbButton>
            </MrbForm>
          </MrbCard>
        </MrbCol>
      </MrbRow>
    </>
  )
}
